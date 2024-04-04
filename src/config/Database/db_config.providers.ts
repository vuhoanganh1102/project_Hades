import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    inject: [ConfigService],
    provide: 'DATA_SOURCE',
    useFactory: async (configService: ConfigService) => {
      const MYSQL;
    },
  },
];
