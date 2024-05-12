import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/common/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { signInDto } from './dto/signIn.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async createUser(data: CreateUserDto) {
    const checkUser = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!checkUser) {
      const hashedPass = await bcrypt.hash(data.password, 10);
      const newUser = await this.prisma.user.create({
        data: {
          bio: "",
          name: data.name,
          email: data.email,
          password: hashedPass,
        },
      });      
        

        if (newUser) {
          return { statusCode: 201, message: 'User Created Successfully', user:newUser };
        } else {
          throw new InternalServerErrorException();
        }
      }
     else {
      return { statusCode: 400, message: 'User With Email Already Exists' };
    }
  }
  

  async signIn(data: signInDto) {
    const findUser = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (findUser) {
      const comparePass = await bcrypt.compare(
        data.password,
        findUser.password,
      );
      console.log(process.env.JWT_SECRET)
      if (!comparePass) {
        return { statusCode: 402, message: 'Invalid Password' };
      } else {
        const token = this.jwtService.sign({
          id: findUser.id
          // email: findUser.email,
        });

        const updateUser = await this.prisma.user.update({
          where: {
            email: data.email,
          },
          data: {
            token: "Bearer " + token,
          },
        });

        if (updateUser) {
          return {
            statusCode: 201,
            message: 'Signin Successfull',
            user: updateUser,
          };
        } else {
          throw new InternalServerErrorException();
        }
      }
    } else {
      return { statusCode: 404, message: 'User With Email Does Not Exist' };
    }
  }
  async findAll() {
    const users = await this.prisma.user.findMany({});
    if (users.length > 0) {
      return {
        statusCode: 200,
        message: 'Users Fetched Successfully',
        users,
      };
    } else {
      return { statusCode: 200, message: 'No Users Found', users };
    }
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    if (user) {
      return { statusCode: 200, message: 'User Found', user };
    } else {
      throw new NotFoundException();
    }
  }

  async update(id: string, data: UpdateUserDto) {
    const updateUser = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        bio: data.bio,
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
    if (updateUser) {
      return { statusCode: 201, message: 'User Updated Successfully' };
    } else {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: string) {
    try {
    } catch (error) {}
    const deleteUser = await this.prisma.user.delete({
      where: {
        id: id,
      },
    });

    if (deleteUser) {
      return { statusCode: 201, message: 'User Deleted Successfully.' };
    } else {
      return { statusCode: 201, messaage: 'User Does Not Exist' };
    }
  }
}
