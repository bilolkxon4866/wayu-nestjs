import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { DeleteVacanciesCommand } from './delete-vacancies.command';
import { VacanciesEntity } from '../../vacancies.entity';

@CommandHandler(DeleteVacanciesCommand)
export class DeleteVacanciesHandler implements ICommandHandler<DeleteVacanciesCommand> {
    async execute(cmd: DeleteVacanciesCommand): Promise<void> {
        const entity = await VacanciesEntity.findOneBy({ id: cmd.id });
        if (!entity) {
            throw new NotFoundException("Berilgan id bo'yicha ma'lumot topilmadi");
        }
        await VacanciesEntity.remove(entity);
    }
}
