module.exports = function (plop) {
  // create your generators here
  plop.setGenerator('component', {
    description: 'this is a skeleton plopfile',
    prompts: [
      {
        type: 'list',
        name: 'folder',
        message: 'What folder?',
        choices: ['browser-action', 'content-script'],
        default: 'content-script',
      },
      {
        type: 'input',
        name: 'name',
        message: 'What name?',
      },
      {
        type: 'list',
        name: 'type',
        message: 'What type?',
        choices: ['fc', 'fc-hoc', 'class', 'class-hoc'],
      },
    ],
    actions: (data) => {
      const actions = [];
      if (data.type === 'fc') {
        actions.push(
          ...[
            {
              type: 'add',
              templateFile: './plop-templates/fc/component.hbs',
              path: './{{folder}}/components/{{dashCase name}}/components/{{dashCase name}}.tsx',
              abortOnFail: true,
            },
            {
              type: 'add',
              templateFile: './plop-templates/fc/types.hbs',
              path: './{{folder}}/components/{{dashCase name}}/types/{{dashCase name}}.ts',
              abortOnFail: true,
            },
            {
              type: 'add',
              templateFile: './plop-templates/fc/index.hbs',
              path: './{{folder}}/components/{{dashCase name}}/index.ts',
              abortOnFail: true,
            },
          ]
        );
      }
      return actions;
    },
  });
};
