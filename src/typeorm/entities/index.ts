import { User } from './user.entity';
import { Session } from './session.entity';
import { Role } from './role.entity';
import { Permission } from './permission.entity';
import { Subject } from './subject.entity';

const entities = [User, Session, Role, Permission, Subject];

export { User, Session, Role, Permission, Subject };

export default entities;
