import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import { User } from '../interfaces/users.interface';
import { UserModel } from '../entity/users.entity';
import { isEmpty } from '../utils/util';
import { Service } from 'typedi';

@Service()
class UserService {
  constructor(public userModel: UserModel) {
  }

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.userModel.db.find();
    return users;
  }

     public async findUserById(userId: number): Promise<User> {
    const findUser: User = await this.userModel.db.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.userModel.db.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: User = await this.userModel.db.save({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async updateUser(userId: number, userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
    const findUser: User = await this.userModel.db.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "You're not user");

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    await this.userModel.db.update(userId, { ...userData, password: hashedPassword });

    const updateUser: User = await this.userModel.db.findOne({ where: { id: userId } });
    return updateUser;
  }

  public async deleteUser(userId: number): Promise<User> {
    const findUser: User = await this.userModel.db.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "You're not user");

    await this.userModel.db.delete({ id: userId });
    return findUser;
  }
}

export default UserService;
