import { Test, TestingModule } from '@nestjs/testing';
import { ExternalApiService } from './external-api.service';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('ExternalApiService', () => {
  let service: ExternalApiService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExternalApiService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ExternalApiService>(ExternalApiService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should return weather data', async () => {
    const mockResponse: AxiosResponse<any> = {
      data: { weather: 'data' },
      status: 200,
      statusText: 'OK',
      headers: {},
      // @ts-ignore
      config: {},
    };

    jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse));

    const result = await service.getWeather({ lat: 33.44, lon: -94.04, part: 'hourly,daily' });
    expect(result).toEqual(mockResponse.data);
  });

  it('should throw an error if the request fails', async () => {
    const mockErrorResponse = {
      response: {
        data: 'Not Found',
        status: 404,
      },
    };

    jest.spyOn(httpService, 'get').mockReturnValue(throwError(mockErrorResponse));

    await expect(service.getWeather({ lat: 33.44, lon: -94.04, part: 'hourly,daily' })).rejects.toThrow(
      new HttpException('Not Found', 404)
    );
  });
});
