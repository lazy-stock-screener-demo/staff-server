import { Result } from "../../../../shared/application/Result";
import {
  errorInstance,
  successInstance,
} from "../../../../shared/application/EitherError";
import { IUseCase } from "../../../../shared/application/IUseCase";
import { AppError } from "../../../../shared/application/AppError";
import { EitherError } from "../../../../shared/application/EitherError";
import { IStaffRepo } from "../../../infra/repos/sequelizeORM/StaffRepoSequelize";
import { CreateStaffReqDTO } from "./CreateStaffDTO";
import { CreateStaffErrors } from "./CreateStaffErrors";
import { StaffEmail } from "../../../domain/StaffEmail";
import { StaffPassword } from "../../../domain/StaffPassword";
import { StaffName } from "../../../domain/StaffName";
import { Staff } from "../../../domain/Staff";

type Response = EitherError<
  | CreateStaffErrors.EmailAlreadyExistsError
  | CreateStaffErrors.StaffNameTakenError
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;

export class CreateStaffUseCase
  implements IUseCase<CreateStaffReqDTO, Promise<Response>> {
  private staffRepo: IStaffRepo;

  constructor(staffRepo: IStaffRepo) {
    this.staffRepo = staffRepo;
  }

  async execute(reqDTO: CreateStaffReqDTO): Promise<Response> {
    const emailOrError = StaffEmail.create({ value: reqDTO.email });
    const passwordOrError = StaffPassword.create({ value: reqDTO.password });
    const usernameOrError = StaffName.create({ value: reqDTO.staffName });

    const dtoResult = Result.combine([
      emailOrError,
      passwordOrError,
      usernameOrError,
    ]);

    if (dtoResult.isFailure) {
      return errorInstance(Result.fail<void>(dtoResult.getErr())) as Response;
    }

    const email: StaffEmail = emailOrError.getData();
    const password: StaffPassword = passwordOrError.getData();
    const username: StaffName = usernameOrError.getData();

    try {
      // Check StaffEmail has been taken or not?
      const staffAlreadyExists = await this.staffRepo.exists(email);

      if (staffAlreadyExists) {
        return errorInstance(
          new CreateStaffErrors.EmailAlreadyExistsError(email.value)
        ) as Response;
      }

      // Check StaffName has been taken or not?
      const alreadyCreatedUserByUserName = await this.staffRepo.getUserByUserName(
        username
      );

      const userNameTaken = !!alreadyCreatedUserByUserName === true;

      if (userNameTaken) {
        return errorInstance(
          new CreateStaffErrors.StaffNameTakenError(username.value)
        ) as Response;
      }

      // Create Staff
      const userOrError: Result<Staff> = Staff.create({
        email,
        password,
        username,
      });

      if (userOrError.isFailure) {
        return errorInstance(
          Result.fail<Staff>(userOrError.getErr().toString())
        ) as Response;
      }

      // Save Staff
      const staff: Staff = userOrError.getData();

      await this.staffRepo.save(staff);

      return successInstance(Result.ok<void>());
    } catch (err) {
      return errorInstance(new AppError.UnexpectedError(err)) as Response;
    }
  }
}
