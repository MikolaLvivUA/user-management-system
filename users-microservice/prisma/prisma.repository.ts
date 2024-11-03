import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

type Operations =
  | 'aggregate'
  | 'count'
  | 'create'
  | 'createMany'
  | 'delete'
  | 'deleteMany'
  | 'findFirst'
  | 'findMany'
  | 'findFirstOrThrow'
  | 'findUnique'
  | 'update'
  | 'updateMany'
  | 'upsert';
@Injectable()
export class PrismaRepository<
  D extends { [K in Operations]: (args: unknown) => unknown },
  A extends { [K in Operations]: unknown },
  R extends { [K in Operations]: unknown },
> {
  private modelName: string;
  constructor(protected model: D) {
    this.modelName = this.model['name'];
  }

  async findUnique(args: A['findUnique']): Promise<R['findUnique']> {
    return await this.model.findUnique(args);
  }

  async findFirst(args: A['findFirst']): Promise<R['findFirst']> {
    return await this.model.findFirst(args);
  }

  async findMany(args?: A['findMany']): Promise<R['findMany']> {
    return await this.model.findMany(args);
  }

  async create(args: A['create']): Promise<R['create']> {
    return await this.model.create(args);
  }

  async createMany(args: A['createMany']): Promise<R['createMany']> {
    return await this.model.createMany(args);
  }

  async update(args: A['update'], additionalParam: any = this.modelName): Promise<R['update']> {
    return await this.model.update(args);
  }

  async delete(args: A['delete']): Promise<R['delete']> {
    return await this.model.delete(args);
  }

  async upsert(args: A['upsert']): Promise<R['upsert']> {
    return await this.model.upsert(args);
  }

  async count(args?: A['count']): Promise<R['count']> {
    return await this.model.count(args);
  }

  async aggregate(args: A['aggregate']): Promise<R['aggregate']> {
    return await this.model.aggregate(args);
  }

  async deleteMany(args: A['deleteMany']): Promise<R['deleteMany']> {
    return await this.model.deleteMany(args);
  }

  async updateMany(args: A['updateMany']): Promise<R['updateMany']> {
    return await this.model.updateMany(args);
  }

  async throwIfExist(args: A['findFirst']): Promise<void> {
    const record = await this.model.findFirst(args);
    if (record) {
      throw new HttpException('Already exist', HttpStatus.BAD_REQUEST);
    }
  }

  async findAndCount(limit, page, include, where, orderBy?): Promise<{ rows: R['findMany']; count: R['count'] }> {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const rows: R[] = (await this.model.findMany({ include: include, where, orderBy })) as R[];
    const count = rows.length;
    return { rows: rows.slice(startIndex, endIndex), count };
  }
}
export type DelegateArgs<T> = {
  [K in keyof T]: T[K] extends (args: infer A) => Promise<unknown> ? A : never;
};

export type DelegateReturnTypes<T> = {
  [K in keyof T]: T[K] extends (args: infer A) => Promise<infer R> ? R : never;
};
