import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ExternalApiService {
    constructor(
        private readonly httpService: HttpService
    ) {}
    
    async getWeather({ lat, lon, part }) {
        const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${process.env.API_KEY}`;

        const res = this.httpService.get(apiUrl).pipe(
            catchError((error) => {
            throw new HttpException(
                    error.response?.data || 'Unable to fetch weather data',
                    error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
                );
            })
        );

        return (await lastValueFrom(res)).data;
    }
}
