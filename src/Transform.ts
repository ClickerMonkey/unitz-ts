
import { isDefined, coalesce } from './Functions';
import { System } from './System';

export interface TransformInput {
  common?: boolean;
  system?: System;
}

export class Transform implements TransformInput
{

  public common: boolean = true;
  public system: System = System.GIVEN;

  public constructor(input?: TransformInput)
  {
    if (isDefined(input))
    {
      this.set( input );
    }
  }

  public set(input: TransformInput): this
  {
    this.common = coalesce( input.common, this.common );
    this.system = coalesce( input.system, this.system );

    return this;
  }

  public extend(input?: TransformInput): Transform
  {
    let extended: Transform = this;

    if (isDefined(input))
    {
      if (input instanceof Transform)
      {
        extended = input;
      }
      else
      {
        extended = new Transform( this );
        extended.set( input );
      }
    }

    return extended;
  }

}
