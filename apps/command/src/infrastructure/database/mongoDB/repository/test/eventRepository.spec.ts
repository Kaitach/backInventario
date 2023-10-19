import { Model } from "mongoose";
import { of, throwError } from "rxjs";
import { CreateEventDto, RegisterUserDto, RegisterProductDTO } from "../../../.././../infrastructure/utils";
import { IBranchRegister } from "../../../../../../../shared";
import { EventDocument } from "../../schemas";
import { EventRepository } from "../eventRepository";

describe('EventRepository', () => {
  let eventRepository: EventRepository;
  let model: Model<EventDocument>;

  beforeEach(() => {
    model = {
        create: jest.fn(),
        find: jest.fn(),
        findOne: jest.fn(),
        findOneAndUpdate: jest.fn(),
        updateOne: jest.fn(),
        deleteOne: jest.fn(),
    } as unknown as Model<EventDocument>;

    eventRepository = new EventRepository(model);
  });

  it('should be defined', () => {
    expect(eventRepository).toBeDefined();
  });

  describe('saveEvent', () => {
    it('should save an event', () => {
      const event: CreateEventDto = {
          eventId: "",
          eventType: "",
          eventData: "",
          eventPublishedAt: undefined,
          eventAggregateRootId: ""
      };
      const eventAggregateRootId = 'your-aggregate-root-id';

    //   jest.spyOn(model, 'create').mockReturnValue(of(event));

      eventRepository.saveEvent(event, eventAggregateRootId);

      expect(model.create).toHaveBeenCalledWith({
        ...event,
        eventAggregateRootId,
      });
    });
  });

  describe('existBranch', () => {
    it('should check if a branch exists', (done) => {
      const branch: IBranchRegister = {
          name: "",
          location: {
              country: "",
              city: ""
          }
      };

      const eventDataJson = JSON.stringify(branch);
      const event = {
        eventType: 'BranchRegister',
        eventData: eventDataJson,
      };

    //   jest.spyOn(model, 'find').mockReturnValue(of([event]));

      const result$ = eventRepository.existBranch(branch);

      result$.subscribe((exists) => {
        expect(exists).toBe(true);
        done();
      });
    });

    it('should return false when a branch does not exist', (done) => {
      const branch: IBranchRegister = {
          name: "",
          location: {
              country: "",
              city: ""
          }
      };

    //   jest.spyOn(model, 'find').mockReturnValue(of([]));

      const result$ = eventRepository.existBranch(branch);

      result$.subscribe((exists) => {
        expect(exists).toBe(false);
        done();
      });
    });

    it('should throw an error when checking if a branch exists', (done) => {
      const branch: IBranchRegister = {
          name: "",
          location: {
              country: "",
              city: ""
          }
      };

    //   jest.spyOn(model, 'find').mockReturnValue(throwError('Error al buscar sucursales en la base de datos.'));

      const result$ = eventRepository.existBranch(branch);

      result$.subscribe({
        error: (error) => {
          expect(error).toBe('Error al buscar sucursales en la base de datos.');
          done();
        },
      });
    });
  });

  describe('existUser', () => {
    it('should check if a user exists', (done) => {
      const user: RegisterUserDto = {
          email: "",
          password: "",
          role: "",
          name: { firstName:'', lastName: ''},
          branchId: ""
      };

      const eventDataJson = JSON.stringify(user);
      const event = {
        eventType: 'new.User',
        eventAggregateRootId: user.branchId,
        eventData: eventDataJson,
      };

      jest.spyOn(model, 'find').mockReturnValue(of([event]) as any );

      const result$ = eventRepository.existUser(user);

      result$.subscribe((exists) => {
        expect(exists).toBe(true);
        done();
      });
    });

    it('should return false when a user does not exist', (done) => {
      const user: RegisterUserDto = {
          email: "",
          password: "",
          role: "",
          name: {firstName: '', lastName: ''    },
          branchId: ""
      };

    //   jest.spyOn(model, 'find').mockReturnValue(of([]));

      const result$ = eventRepository.existUser(user);

      result$.subscribe((exists) => {
        expect(exists).toBe(false);
        done();
      });
    });

    it('should throw an error when checking if a user exists', (done) => {
      const user: RegisterUserDto = {
          email: "",
          password: "",
          role: "",
          name: {firstName: '', lastName: '',},
          branchId: ""
      };

      jest.spyOn(model, 'find').mockReturnValue(throwError('Error al buscar eventos en la base de datos.') as any);

      const result$ = eventRepository.existUser(user);

      result$.subscribe({
        error: (error) => {
          expect(error).toBe('Error al buscar eventos en la base de datos.');
          done();
        },
      });
    });
  });

  describe('existProduct', () => {
    it('should check if a product exists', (done) => {
      const product: RegisterProductDTO = {
          name: "",
          description: "",
          price: 0,
          category: "",
          branchId: ""
      };

      const event = {
        eventAggregateRootId: product.branchId,
        eventType: 'productRegister',
        eventData: JSON.stringify(product),
      };

      jest.spyOn(model, 'find').mockReturnValue(of([event]) as any);

      const result$ = eventRepository.existProduct(product);

      result$.subscribe((exists) => {
        expect(exists).toBe(true);
        done();
      });
    });

    it('should return false when a product does not exist', (done) => {
      const product: RegisterProductDTO = {
          name: "",
          description: "",
          price: 0,
          category: "",
          branchId: ""
      };

      jest.spyOn(model, 'find').mockReturnValue(of([]) as any);

      const result$ = eventRepository.existProduct(product);

      result$.subscribe((exists) => {
        expect(exists).toBe(false);
        done();
      });
    });

    it('should throw an error when checking if a product exists', (done) => {
      const product: RegisterProductDTO = {
          name: "",
          description: "",
          price: 0,
          category: "",
          branchId: ""
      };

      jest.spyOn(model, 'find').mockReturnValue(throwError('Error al buscar eventos en la base de datos.') as any);

      const result$ = eventRepository.existProduct(product);

      result$.subscribe({
        error: (error) => {
          expect(error).toBe('Error al buscar eventos en la base de datos.');
          done();
        },
      });
    });
  });

  describe('findProduct', () => {


   

    it('should throw an error when checking for a product', (done) => {
      const branchId = 'your-branch-id';
      const productId = 'your-product-id';

      jest.spyOn(model, 'find').mockReturnValue(throwError('Error al buscar eventos en la base de datos.') as any);

      const result$ = eventRepository.findProduct(branchId, productId);

      result$.subscribe({
        error: (error) => {
          expect(error).toBe('Error al buscar eventos en la base de datos.');
          done();
        },
      });
    });
  });
});
