import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagsRepositories"
import { classToPlain } from "class-transformer";

class ListTagsService {
    async execute() {
        const tagsRepostories = getCustomRepository(TagsRepositories);

        const tags = await tagsRepostories.find();

        return classToPlain(tags);
    }
}

export { ListTagsService }