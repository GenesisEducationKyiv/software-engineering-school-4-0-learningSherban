import { Test, TestingModule } from '@nestjs/testing';
import { OpenExchangeApi } from '../api/openexchange.api';
import { PrivatBankApi } from '../api/privatbank.api';
import { CurrencyChain } from '../currency.chain';

describe('CurrencyChain', () => {
  let currencyChain: CurrencyChain;
  let privatBankApi: PrivatBankApi;
  let openExchangeApi: OpenExchangeApi;

  jest.mock('@common/api/base-axios.api');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrencyChain,
        {
          provide: PrivatBankApi,
          useValue: { getRate: jest.fn() },
        },
        {
          provide: OpenExchangeApi,
          useValue: { getRate: jest.fn() },
        },
      ],
    }).compile();

    currencyChain = module.get<CurrencyChain>(CurrencyChain);
    privatBankApi = module.get<PrivatBankApi>(PrivatBankApi);
    openExchangeApi = module.get<OpenExchangeApi>(OpenExchangeApi);
  });

  it('should return currency data from the first provider that succeeds', async () => {
    jest.spyOn(openExchangeApi, 'getRate').mockResolvedValue(1.2);
    jest.spyOn(privatBankApi, 'getRate').mockResolvedValue(1.3);

    const rate = await currencyChain.getCurrencyData('USD');
    expect(rate).toBe(1.2);
    expect(openExchangeApi.getRate).toHaveBeenCalledWith('USD');
    expect(privatBankApi.getRate).not.toHaveBeenCalled();
  });

  it('should return currency data from the second provider if the first one fails', async () => {
    jest
      .spyOn(openExchangeApi, 'getRate')
      .mockRejectedValue(new Error('Failed'));
    jest.spyOn(privatBankApi, 'getRate').mockResolvedValue(1.3);

    const rate = await currencyChain.getCurrencyData('USD');
    expect(rate).toBe(1.3);
    expect(openExchangeApi.getRate).toHaveBeenCalledWith('USD');
    expect(privatBankApi.getRate).toHaveBeenCalledWith('USD');
  });

  it('should throw an error if all providers fail', async () => {
    jest
      .spyOn(openExchangeApi, 'getRate')
      .mockRejectedValue(new Error('Failed'));
    jest.spyOn(privatBankApi, 'getRate').mockRejectedValue(new Error('Failed'));

    await expect(currencyChain.getCurrencyData('USD')).rejects.toThrow(
      'All providers failed',
    );
    expect(openExchangeApi.getRate).toHaveBeenCalledWith('USD');
    expect(privatBankApi.getRate).toHaveBeenCalledWith('USD');
  });
});
