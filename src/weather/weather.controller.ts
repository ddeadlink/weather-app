import { Controller, Get, Post, Body, Query, UseInterceptors } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherInterceptor } from './weather.interceptor';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  async create(
    @Body('lat') lat: string,
    @Body('lon') lon: string,
    @Body('part') part: string,
  ) {
    return await this.weatherService.create({ lat, lon, part });
  }

  @Get()
  @UseInterceptors(WeatherInterceptor)
  async get(
    @Query('lat') lat: string,
    @Query('lon') lon: string,
  ) {
    return await this.weatherService.get({ lat, lon });
  }
}
