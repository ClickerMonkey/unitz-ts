
import { Core } from '../Core';
import { Weight } from './Weight';
import { Area } from './Area';
import { Time } from './Time';
import { Digital } from './Digital';
import { Temperature } from './Temperature';
import { Angle } from './Angle';
import { Volume } from './Volume';
import { Length } from './Length';

/**
 * Adds all classes that come with Unitz to [Core].
 */
export function addDefaults()
{
  Core.addClasses(
    Weight,
    Area,
    Time,
    Digital,
    Temperature,
    Angle,
    Volume,
    Length
  );
}
