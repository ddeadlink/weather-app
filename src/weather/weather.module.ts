import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weather } from './entities/weather.entity';
import { ExternalApiModule } from '../external-api/external-api.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Weather
    ]),
    ExternalApiModule,
  ],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
