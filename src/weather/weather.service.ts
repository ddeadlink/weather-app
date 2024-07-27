import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Weather } from './entities/weather.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ExternalApiService } from '../external-api/external-api.service';

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(Weather)
    private readonly weatherRepo: Repository<Weather>,
    private readonly externalApiService: ExternalApiService,
  ) {}

  async create({ lat, lon, part }) {
    const weatherApiRes = await this.externalApiService.getWeather({ lat, lon, part });

    const weatherDto = this.weatherRepo.create(weatherApiRes);

    return this.weatherRepo.save(weatherDto);
  }

  async get({ lat, lon }) {
    return this.weatherRepo.findOne({
      where: { lat, lon },
    });
  }
}
