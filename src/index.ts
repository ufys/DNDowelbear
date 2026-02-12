import OBR, { ToolbarAction, buildToolbarAction } from '@owlbear-rodeo/sdk';

OBR.onLoad(async () => {
  // Создаём действие в панели инструментов
  const action: ToolbarAction = buildToolbarAction({
    id: 'com.yourname.dndsheet.open',
    icons: [
      { icon: '/icons/toolbar-icon.svg', label: 'D&D Character Sheet' },
    ],
    onClick: async () => {
      // Открываем popup
      await OBR.ui.createPopup({
        id: 'com.yourname.dndsheet.popup',
        url: '/popup.html',
        width: 500,
        height: 600,
      });
    },
  });

  OBR.action.registerToolbarAction(action);

  // Закрывать popup при смене сцены
  OBR.scene.onChange(async () => {
    await OBR.ui.closePopup('com.yourname.dndsheet.popup');
  });
});

OBR.onUnload(() => {
  // Очистка при выгрузке (опционально)
});
