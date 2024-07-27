import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

describe('WeatherController', () => {
  let weatherController: WeatherController;
  let weatherService: WeatherService;

  const mockWeatherService = {
    create: jest.fn(),
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [
        { provide: WeatherService, useValue: mockWeatherService },
      ],
    }).compile();

    weatherController = module.get<WeatherController>(WeatherController);
    weatherService = module.get<WeatherService>(WeatherService);
  });

  it('should be defined', () => {
    expect(weatherController).toBeDefined();
  });

  describe('create', () => {
    it('should call weatherService.create with correct parameters', async () => {
      const lat = '33.44';
      const lon = '-94.04';
      const part = 'hourly,daily';
      const result = { id: 1 };

      mockWeatherService.create.mockResolvedValue(result);

      expect(await weatherController.create(lat, lon, part)).toBe(result);
      expect(weatherService.create).toHaveBeenCalledWith({ lat, lon, part });
    });
  });

  describe('get', () => {
    it('should call weatherService.get with correct parameters', async () => {
      const lat = '33.44';
      const lon = '-94.04';
      const result = {
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

      mockWeatherService.get.mockResolvedValue(result);

      expect(await weatherController.get(lat, lon)).toBe(result);
      expect(weatherService.get).toHaveBeenCalledWith({ lat, lon });
    });
  });
});
