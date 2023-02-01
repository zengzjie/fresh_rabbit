import { Rules } from '@/utils/validate';

type Value = any;
export type Values = Record<string, Value>;

export type ParentDataProps = {
  borderBottom: boolean;
  labelWidth: number | 'auto';
  labelPosition: 'left' | 'top';
  labelStyle: any;
  labelAlign: 'left' | 'center' | 'right';
};

export type ParentDataKeys = Partial<ParentDataProps>;

export type XFormProps = {
  formEmitter: any;
  model: Values;
  rules: Rules;
  errorType: ['none', 'message', 'toast'];
} & ParentDataKeys;

export type XFormItemProps = {
  label: string;
  prop: string;
  formItemEmitter: any;
  validated: (trigger: string, cb: (error: string) => void) => Promise<Values>;
  resetField: () => void;
};
