import { ValueObject } from "../../shared/domain/ValueObject";
import { Result } from "../../shared/application/Result";
import { Guard } from "../../shared/application/Guard";
import TextTools from "../../shared/application/utils/TextTools";

interface IRoleVIDProps {
  value: string;
}

export class RoleVID extends ValueObject<IRoleVIDProps> {
  get value(): string {
    return this.props.value;
  }
  private constructor(props: IRoleVIDProps) {
    super(props);
  }
  public static create(props: IRoleVIDProps): Result<RoleVID> {
    let partRoleID = "";
    partRoleID = TextTools.extractSubString(props.value);
    partRoleID = partRoleID.replace(/-/g, "");
    return Result.ok<RoleVID>(new RoleVID({ value: partRoleID }));
  }
}
