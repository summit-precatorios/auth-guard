import { validate } from 'class-validator';
import { AnnouncementCreateRequest } from 'src/announcement/requests/announcement-create.request';

describe('AnnouncementCreateRequest', () => {
  it('should validate type as "RPV" or "PRECATORIO"', async () => {
    const validRequest1 = new AnnouncementCreateRequest();
    validRequest1.type = 'RPV';

    const validRequest2 = new AnnouncementCreateRequest();
    validRequest2.type = 'PRECATORIO';

    const invalidReques = new AnnouncementCreateRequest();
    invalidReques.type = 'INVALID';

    const errors1 = await validate(validRequest1);
    const errors2 = await validate(validRequest2);
    const errors3 = await validate(invalidReques);

    expect(errors1.length).toBe(0);
    expect(errors2.length).toBe(0);
    expect(errors3.length).toBeGreaterThan(0);
    expect(errors3[0].constraints).toHaveProperty('isTypeAnnouncementString');
    expect(errors3[0].constraints!.isTypeAnnouncementString).toBe(
      'Valor inválido. Deve ser "RPV" ou "PRECATORIO"',
    );
  });
});
