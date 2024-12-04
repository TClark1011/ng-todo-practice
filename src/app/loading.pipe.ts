import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingObservable, loadingState } from './utils';

@Pipe({
  name: 'loading',
})
export class LoadingPipe implements PipeTransform {
  transform<T>(value: Observable<T>): LoadingObservable<T> {
    return loadingState(value);
  }
}
