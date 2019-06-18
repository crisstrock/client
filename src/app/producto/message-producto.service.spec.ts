import { TestBed } from '@angular/core/testing';

import { MessageProductoService } from './message-producto.service';

describe('MessageProductoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageProductoService = TestBed.get(MessageProductoService);
    expect(service).toBeTruthy();
  });
});
