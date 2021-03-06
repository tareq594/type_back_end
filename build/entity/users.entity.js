"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const typeorm_2 = require("typeorm");
const typedi_1 = require("typedi");
let UserEntity = class UserEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], UserEntity.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], UserEntity.prototype, "updatedAt", void 0);
UserEntity = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Unique(['email'])
], UserEntity);
exports.UserEntity = UserEntity;
let UserModel = class UserModel {
    constructor() {
        this.users = UserEntity;
        this.db = typeorm_2.getRepository(this.users);
    }
};
UserModel = __decorate([
    typedi_1.Service()
], UserModel);
exports.UserModel = UserModel;
//# sourceMappingURL=users.entity.js.map