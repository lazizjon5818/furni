import {
  Logger,
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // Xatolikning holatini aniqlash
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let responseBody: any;

    // Agar bu HttpException bo'lsa, uni ko'rib chiqamiz
    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();

      // Xato javobini shakllantirish
      responseBody =
        typeof exceptionResponse === 'object' && 'response' in exceptionResponse
          ? exceptionResponse['response']
          : exceptionResponse;
    } else {
      // Agar boshqa xatolik bo'lsa
      responseBody = {
        message: 'An unexpected error occurred',
        // Stack trace faqat development muhitida yuboriladi
        ...(process.env.NODE_ENV === 'development' && { stack: (exception as Error).stack }),
      };
    }

    // Xatolikni batafsil loglash
    this.logger.error(
      `Method: ${request.method} | URL: ${request.url} | Status: ${status} | Error: ${JSON.stringify(responseBody)} | Exception: ${JSON.stringify(exception)}`,
    );

    // Foydalanuvchiga xatolikni yuborish
    response.status(status).json({
      statusCode: status,
      message: responseBody.message || 'An unexpected error occurred',
      // Stack trace faqat development muhitida yuboriladi
      ...(process.env.NODE_ENV === 'development' && { stack: (exception as Error).stack }),
    });
  }
}
