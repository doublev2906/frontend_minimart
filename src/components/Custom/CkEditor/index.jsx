import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import PropTypes from "prop-types";

CkEditor.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	value: PropTypes.string.isRequired,
	setFormValue: PropTypes.func.isRequired,
};

CkEditor.defaultProps = {
	name: "",
	label: "",
	value: "",
};

function CkEditor(props) {
	const { name, label, value, setFormValue } = props;

	return (
		<div className='CkEditor'>
			<label className='input__label form-label'>{label}</label>
			<CKEditor
				editor={ClassicEditor}
				data={value}
				onChange={(event, editor) => {
					const data = editor.getData();
					setFormValue(name, data);
				}}
			/>
		</div>
	);
}

export default CkEditor;
