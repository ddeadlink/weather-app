import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'weatherLocal', synchronize: false })
export class WeatherLocal {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'integer' })
    sunrise: number;

    @Column({ type: 'integer' })
    sunset: number;

    @Column({ type: 'float' })
    temp: number;

    @Column({ type: 'float' })
    feels_like: number;

    @Column({ type: 'integer' })
    pressure: number;

    @Column({ type: 'integer' })
    humidity: number;

    @Column({ type: 'float' })
    uvi: number;

    @Column({ type: 'float' })
    wind_speed: number;
}


@Entity({ name: 'weather' })
export class Weather {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('double precision')
    lat: number;

    @Column('double precision')
    lon: number;

    @Column()
    timezone: string;

    @Column()
    timezone_offset: number;

    @Column('json')
    current: any;

    @Column('json')
    minutely: any;
}