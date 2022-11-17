export function ImagePickerModal({
    isVisible,
    onClose,
    onImageLibraryPress,
    onCameraPress,
  }) {
    return (
      <Modal
        isVisible={isVisible}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        style={{}}>
        <SafeAreaView style={{}}>
          <Pressable style={{}} onPress={onImageLibraryPress}>
            <Image style={{}} source={images.image} />
            <Text style={{}}>Library</Text>
          </Pressable>
          <Pressable style={{}} onPress={onCameraPress}>
            <Image style={{}} source={images.camera} />
            <Text style={{}}>Camera</Text>
          </Pressable>
        </SafeAreaView>
      </Modal>
    );
  }