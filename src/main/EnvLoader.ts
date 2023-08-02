import dotenv from 'dotenv';

class EnvLoader {
  public static load(): void {
    dotenv.config();

    this.loadDevEnvVariables();
    // if (mode === 'development' || mode === 'test') this.loadDevEnvVariables();

    // if (mode === 'production') this.loadProdEnvVariables();
  }

  private static loadDevEnvVariables(): void {
    process.env.KEYWORDS_SPREADSHEET_ID = process.env.KEYWORDS_SPREADSHEET_ID_DEVELOPMENT as string;
  }

  private static loadProdEnvVariables(): void {
    process.env.KEYWORDS_SPREADSHEET_ID = process.env.KEYWORDS_SPREADSHEET_ID_PRODUCTION as string;
  }
}

export default EnvLoader;
