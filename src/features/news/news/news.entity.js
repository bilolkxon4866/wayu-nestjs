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
exports.NewsEntity = void 0;
const typeorm_1 = require("typeorm");
const base_module_1 = require("../../../core/base-module");
const newsCategories_entity_1 = require("../news-category/newsCategories.entity");
const countries_entity_1 = require("../../countries/countries.entity");
const newstags_entity_1 = require("../../entities/newstags.entity");
let NewsEntity = class NewsEntity extends base_module_1.BaseModule {
    title;
    image;
    date;
    content;
    categoryId;
    newsCategory;
    country;
    newstag;
};
exports.NewsEntity = NewsEntity;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 256 }),
    __metadata("design:type", String)
], NewsEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 128 }),
    __metadata("design:type", String)
], NewsEntity.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], NewsEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], NewsEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], NewsEntity.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => newsCategories_entity_1.NewsCategoriesEntity, (newsCategory) => newsCategory.news),
    (0, typeorm_1.JoinColumn)({ name: 'categoryId' }),
    __metadata("design:type", newsCategories_entity_1.NewsCategoriesEntity)
], NewsEntity.prototype, "newsCategory", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => countries_entity_1.CountriesEntity, (country) => country.news, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'countryId' }),
    __metadata("design:type", countries_entity_1.CountriesEntity)
], NewsEntity.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => newstags_entity_1.NewsTagsEntity, (newsTag) => newsTag.news),
    __metadata("design:type", Array)
], NewsEntity.prototype, "newstag", void 0);
exports.NewsEntity = NewsEntity = __decorate([
    (0, typeorm_1.Entity)('news')
], NewsEntity);
//# sourceMappingURL=news.entity.js.map