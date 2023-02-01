export type Trigger = ('blur' | 'change') | ['blur', 'change'];

/** 校验项目 */
export interface Rule {
  /** 错误提示 */
  message: string;
  /** 非空校验 */
  required?: boolean;
  /** 正则校验 */
  pattern?: RegExp | string;
  /** 触发方式 */
  trigger?: Trigger;
}

export interface Rules {
  [key: string]: Rule[];
}

/*
name: [
    {
        required: true,
        message: '请输入姓名',
        pattern: /\S+/;
    }
]
*/

/**
 * @description: 验证表单数据
 * @param {AnyObject} form 表单数据
 * @param {Rules} rules 校验规则
 * @return {Boolean} 校验结果
 */
export function validate(form: AnyObject, rules: Rules) {
  // 遍历规则
  for (const key in rules) {
    // 获取每一项字段的校验配置
    const ruleKey = rules[key];
    for (let i = 0; i < ruleKey.length; i++) {
      const rule = ruleKey[i];
      // 处理验证规则，非空转换成正则写法，方便统一判断
      if (rule.required) rule.pattern = /\S+/;
      // 兼容用户手写字符串正则
      const reg = new RegExp(rule.pattern as RegExp | string);
      // 数据校验 这里有个特殊条件, /\S+/.test(undefined) 为 true, 要修复为空字符串
      if (!reg.test(form[key] || '')) {
        // 这里的提示设置了icon后无法显示完整的文字, 后续可以自己设置一个组件
        uni.showToast({
          icon: 'none',
          title: rule.message
        });
        // 退出校验, 返回校验结果
        return false;
      }
    }
  }
  // 校验通过
  return true;
}
