import { DataSource, DataSourceOptions } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

export const createTransactionalDataSourceService = async (
    name: string,
    options: DataSourceOptions,
) => {
    const dataSource = new DataSource(options);
    await dataSource.initialize();

    return addTransactionalDataSource({
        name,
        dataSource,
    });
};