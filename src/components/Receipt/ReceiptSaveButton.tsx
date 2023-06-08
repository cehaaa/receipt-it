import React, { RefObject, useCallback, useState } from "react";
import { toPng } from "html-to-image";

import AppButton from "../AppButton/AppButton";

type ReceiptSaveButtonProps = {
	receiptContainerRef: RefObject<HTMLDivElement>;
};

const ReceiptSaveButton: React.FC<ReceiptSaveButtonProps> = ({
	receiptContainerRef,
}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const saveAsImage = useCallback(async () => {
		if (receiptContainerRef.current === null) return;

		try {
			setIsLoading(true);

			const dataUrl = await toPng(receiptContainerRef.current, {
				cacheBust: true,
			});

			const link = document.createElement("a");
			link.download = "receipt.png";
			link.href = dataUrl;

			link.click();
		} finally {
			setIsLoading(false);
		}
	}, []);

	return (
		<AppButton isLoading={isLoading} onClick={saveAsImage}>
			Save as image
		</AppButton>
	);
};

export default ReceiptSaveButton;
