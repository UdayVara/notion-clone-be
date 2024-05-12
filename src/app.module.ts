import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentModule } from './document/document.module';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    secret:"thisismyrandomjwtsecret@1223334444",
    global:true,
  }),UserModule, DocumentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
