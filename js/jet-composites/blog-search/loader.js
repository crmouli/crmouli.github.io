define(['ojs/ojcore', 'text!./view.html', './viewModel', 'text!./component.json', 'css!./styles', 'ojs/ojcomposite','ojs/ojselectcombobox'],
  function(oj, view, viewModel, metadata) {
    oj.Composite.register('blog-search', {
      view: {inline: view}, 
      viewModel: {inline: viewModel}, 
      metadata: {inline: JSON.parse(metadata)}
    });
  }
);