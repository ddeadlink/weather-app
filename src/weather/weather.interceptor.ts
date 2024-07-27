import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WeatherLocal } from './entities/weather.entity';

@Injectable()
export class WeatherInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<WeatherLocal> {
    return next.handle().pipe(
      map((data) => {
        if (!data || !data.current) {
          throw new Error('Invalid data structure');
        }
        
        const { current } = data;
        return {
          id: current.id,
          sunrise: current.sunrise,
          sunset: current.sunset,
          temp: current.temp,
          feels_like: current.feels_like,
          pressure: current.pressure,
          humidity: current.humidity,
          uvi: current.uvi,
          wind_speed: current.wind_speed,
        };
      }),
    );
  }
}
