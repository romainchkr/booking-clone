import { StyleSheet, Text, View } from 'react-native'
import React, { forwardRef, useCallback, useMemo } from 'react'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';

interface Props {}
type Ref = BottomSheetModal;

const DateRangeBottomSheetModal = forwardRef<Ref, Props>((props, ref) => {
  const snapPoints = useMemo(() => ['80%'], []);
  const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props}/>, [])

  return (
    <BottomSheetModal
      index={0}
      snapPoints={snapPoints}
      ref={ref}
      enablePanDownToClose={true}
			backdropComponent={renderBackdrop}
    >
      <View>
        <Text>DateRangeBottomSheetModal</Text>
      </View>
    </BottomSheetModal>
  )
});

const styles = StyleSheet.create({})

export default DateRangeBottomSheetModal;