import { ValueObject } from "../../shared/domain/ValueObject";
import { Result } from "../../shared/application/Result";
import { Guard } from "../../shared/application/Guard";
import TextTools from "../../shared/application/utils/TextTools";
import slug from "slug";

export interface IRoleSlugProps {
  value: string;
}

export class RoleSlug extends ValueObject<IRoleSlugProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: IRoleSlugProps) {
    super(props);
  }
  public static createExisting(props: IRoleSlugProps): Result<RoleSlug> {
    return Result.ok<RoleSlug>(new RoleSlug({ ...props }));
  }
  public static create(props: IRoleSlugProps): Result<RoleSlug> {
    let slugValue = "";

    slugValue = props.value.replace(/[\W]+/g, " ");
    slugValue =
      TextTools.createRandomNumericString(7) + "-" + slug(props.value);

    return Result.ok<RoleSlug>(new RoleSlug({ value: slugValue }));
  }
}
