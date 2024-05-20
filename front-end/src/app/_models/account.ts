import { SystemRole } from './systemRole';
import { CompanyRole } from './companyRole';
import { DepartmentRole } from './departmentRole';
import { WorkersPosition } from './workersPosition';
import { DepartmentCategory } from './departmentCategory';

export class Account {
    id: string;
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    systemRole: SystemRole;
    companyRole: CompanyRole;
    departmentRole: DepartmentRole;
    workersPosition:WorkersPosition;
    departmentCategory: DepartmentCategory;
    moneyIn:number;
    moneyOut:number;
    jwtToken?: string;
}
