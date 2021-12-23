import { Controller, Get, Render } from '@nestjs/common';

@Controller({
  version: ['1'],
  path: 'dashboard',
})
export class DashboardController {

  @Get()
  @Render('dashboard')
  public dashboard(){

  }
}
