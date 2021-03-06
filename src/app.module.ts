import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ParticipantModule } from './participant/participant.module';
import { SeminarModule } from './seminar/seminar.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      ssl: {
        rejectUnauthorized: false,
      },
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity{.ts,.js'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ParticipantModule,
    SeminarModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
