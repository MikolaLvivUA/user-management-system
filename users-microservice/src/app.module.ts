import { Module } from '@nestjs/common';

//Modules
import { RepositoriesModule, UserModule } from './modules';

@Module({
  imports: [RepositoriesModule, UserModule],
  providers: [],
})
export class AppModule {}
