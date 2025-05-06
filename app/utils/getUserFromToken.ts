import type { JWTPayload } from 'jose';
import type { User } from '~/shared/types/User';

export default async (): Promise<User | null> => {
  const payloadUser: JWTPayload | null = await decodeToken();
  console.info(payloadUser);
  if (!payloadUser) return null;

  const user: User = {
    id: payloadUser.id as number,
    email: payloadUser.email as string,
    name: `${payloadUser.firstname} ${payloadUser.lastname}` as string,
    permissions: payloadUser.permissions as string[]
  };

  return user;
}