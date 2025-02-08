import { Controller, Get, Post, Body, Param, Delete, UseGuards, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { DepartmentService } from './department.service';

@ApiTags('department')
@UseGuards(AuthGuard)
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  findAll() {
    return this.departmentService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentService.findById(id);
  }

  @Post()
  @ApiBody({ type: CreateDepartmentDto })
  @HttpCode(HttpStatus.CREATED)
  async createDepartment(@Body() createDepartmentDto: CreateDepartmentDto) {
    return await this.departmentService.create(createDepartmentDto);
  }

  @Put(':id')
  @HttpCode(200)
  async updateDepartment(
    @Param('id') id: string, 
    @Body() body: UpdateDepartmentDto,  
  ) {
    const { name, description } = body;  
  
    const updatedDepartment = await this.departmentService.update({
      id,
      name,
      description,
    });
  
    return { updatedDepartment };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentService.remove(id);
  }

  @Post(':departmentId/users/:userId')
  @HttpCode(HttpStatus.CREATED)
  async addUserToDepartment(
    @Param('departmentId') departmentId: string,
    @Param('userId') userId: string,
  ) {
    return await this.departmentService.addUser(departmentId, userId);
  }

  @Delete(':departmentId/users/:userId')
  @HttpCode(HttpStatus.OK)
  async removeUserFromDepartment(
    @Param('departmentId') departmentId: string,
    @Param('userId') userId: string,
  ) {
    return await this.departmentService.removeUser(departmentId, userId);
  }

  @Post(':departmentId/events/:eventId')
  @HttpCode(HttpStatus.CREATED)
  async addEventToDepartment(
    @Param('departmentId') departmentId: string,
    @Param('eventId') eventId: string,
  ) {
    return await this.departmentService.addEvent(departmentId, eventId);
  }

  @Delete(':departmentId/events/:eventId')
  @HttpCode(HttpStatus.OK)
  async removeEventFromDepartment(
    @Param('departmentId') departmentId: string,
    @Param('eventId') eventId: string,
  ) {
    return await this.departmentService.removeEvent(departmentId, eventId);
  }
}
