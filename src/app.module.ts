import { Module } from '@nestjs/common';
import { authmodule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { bookmodule } from './Book/book.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),
  JwtModule.register({
    signOptions: { expiresIn: '60s' }
  })
    , PassportModule
    , authmodule, bookmodule],
  providers: [],
})
export class AppModule { }
