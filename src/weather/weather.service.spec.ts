import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from './weather.service';
import { ExternalApiService } from '../external-api/external-api.service';
import { Repository } from 'typeorm';
import { Weather } from './entities/weather.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('WeatherService', () => {
  let weatherService: WeatherService;
  let externalApiService: ExternalApiService;
  let weatherRepo: Repository<Weather>;

  const mockExternalApiService = {
    getWeather: jest.fn(),
  };

  const mockWeatherRepo = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherService,
        { provide: ExternalApiService, useValue: mockExternalApiService },
        { provide: getRepositoryToken(Weather), useValue: mockWeatherRepo },
      ],
    }).compile();

    weatherService = module.get<WeatherService>(WeatherService);
    externalApiService = module.get<ExternalApiService>(ExternalApiService);
    weatherRepo = module.get<Repository<Weather>>(getRepositoryToken(Weather));
  });

  describe('create', () => {
    it('should call externalApiService.getWeather and save the weather data', async () => {
      const lat = '33.44';
      const lon = '-94.04';
      const part = 'hourly,daily';
      const weatherApiRes = {
        lat: 33.44,
        lon: -94.04,
        current: {
          id: 1,
          sunrise: 1609459200,
          sunset: 1609497600,
          temp: 295.83,
          feels_like: 296.5,
          pressure: 1019,
          humidity: 90,
          uvi: 1.97,
          wind_speed: 2.06,
        },
      };

      mockExternalApiService.getWeather.mockResolvedValue(weatherApiRes);
      mockWeatherRepo.create.mockReturnValue(weatherApiRes);
      mockWeatherRepo.save.mockResolvedValue(weatherApiRes);

      const result = await weatherService.create({ lat, lon, part });

      expect(externalApiService.getWeather).toHaveBeenCalledWith({ lat, lon, part });
      expect(weatherRepo.create).toHaveBeenCalledWith(weatherApiRes);
      expect(weatherRepo.save).toHaveBeenCalledWith(weatherApiRes);
      expect(result).toEqual(weatherApiRes);
    });
  });

  describe('get', () => {
    it('should call weatherRepo.findOne and return the weather data', async () => {
      const lat = '33.44';
      const lon = '-94.04';
      const weatherData = {
        lat: 33.44,
        lon: -94.04,
        current: {
          id: 1,
          sunrise: 1609459200,
          sunset: 1609497600,
          temp: 295.83,
          feels_like: 296.5,
          pressure: 1019,
          humidity: 90,
          uvi: 1.97,
          wind_speed: 2.06,
        },
      };

      mockWeatherRepo.findOne.mockResolvedValue(weatherData);

      const result = await weatherService.get({ lat, lon });

      expect(weatherRepo.findOne).toHaveBeenCalledWith({ where: { lat, lon } });
      expect(result).toEqual(weatherData);
    });
  });
});
