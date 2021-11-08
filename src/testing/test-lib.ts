import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModuleWithProviders, Provider, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

export declare interface ModuleConfig {
  declarations?: Array<Type<{}>> | null;
  imports?: Array<Type<{}> | ModuleWithProviders<{}>> | null;
  providers?: Provider[] | null;
}

const DEFAULT_COMPONENT_TEST_IMPORTS: Array<
  Type<{}> | ModuleWithProviders<{}>
> = [HttpClientTestingModule, NoopAnimationsModule];

const BASE_HREF_PROVIDER: Provider = {
  provide: APP_BASE_HREF,
  useValue: '/',
};

/**
 * Sets up the all default dependencies used for all component-based tests
 * reducing boilerplate when setting up test modules.
 */
export function setupComponentTestingModule(config: ModuleConfig) {
  TestBed.configureTestingModule({
    ...config,
    imports: DEFAULT_COMPONENT_TEST_IMPORTS.concat(config.imports || []),
    providers: [BASE_HREF_PROVIDER].concat(config.providers || []),
  }).compileComponents();
}
