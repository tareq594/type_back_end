"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
const users_entity_1 = require("../entity/users.entity");
const authMiddleware = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        if (cookies && cookies.Authorization) {
            const secret = process.env.JWT_SECRET;
            const verificationResponse = (await jsonwebtoken_1.default.verify(cookies.Authorization, secret));
            const userId = verificationResponse.id;
            const userRepository = typeorm_1.getRepository(users_entity_1.UserEntity);
            const findUser = await userRepository.findOne(userId, { select: ['id', 'email', 'password'] });
            if (findUser) {
                req.user = findUser;
                next();
            }
            else {
                next(new HttpException_1.default(401, 'Wrong authentication token'));
            }
        }
        else {
            next(new HttpException_1.default(404, 'Authentication token missing'));
        }
    }
    catch (error) {
        next(new HttpException_1.default(401, 'Wrong authentication token'));
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map