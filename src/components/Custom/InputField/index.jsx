import cls from "classnames";
import PropTypes from "prop-types";
import { useState } from "react";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

InputField.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	type: PropTypes.string.isRequired,
	onBlur: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	className: PropTypes.string,
};

InputField.defaultProps = {
	type: "text",
	name: "",
	label: "",
	placeholder: "",
};

function InputField(props) {
	const {
		name,
		errors,
		label,
		type,
		className,
		setFormValue,
		readOnly,
		...rest
	} = props;
	const [value, setValue] = useState(props.value ? props.value : []);
	const [showPassword, setShowPassword] = useState(false);

	const renderPreviewList = () => {
		if (name === "pictures") {
			return value.map((image, index) => (
				<li className='preview__item' key={index}>
					<p
						className='preview__btn'
						onClick={() => {
							const listImage = [...value];
							const index = listImage.indexOf(image);
							if (index >= 0) listImage.splice(index, 1);
							setValue([...listImage]);
							setFormValue(name, [...listImage]);
						}}>
						<i className='fas fa-times'></i>
					</p>
					<img src={image} alt='anh' className='preview__img' />
				</li>
			));
		}
	};

	const renderInputField = () => {
		if (name === "pictures") {
			return (
				<FormGroup className='input'>
					{className ? (
						""
					) : (
						<Label for={name} className='input__label'>
							{label}
						</Label>
					)}
					<Input
						name={name}
						invalid={!!errors[name]}
						type={type}
						{...rest}
						className='input__control d-none'
						autoComplete='on'
						readOnly={readOnly}
					/>
					<ul className='preview__list'>{renderPreviewList()}</ul>
				</FormGroup>
			);
		}

		return (
			<FormGroup className='input'>
				{className || !label ? (
					""
				) : (
					<Label for={name} className='input__label'>
						{label}
					</Label>
				)}
				{type === "password" ? (
					<div
						className={cls({
							input__password: true,
							"is-invalid": !!errors[name]?.message,
						})}>
						<Input
							name={name}
							invalid={!!errors[name]}
							type={showPassword ? "text" : type}
							{...rest}
							className='input__control'
							readOnly={readOnly}
							autoComplete='off'
						/>
						<i
							className={cls({
								"fa-solid fa-eye-slash input__icon": true,
								hide: showPassword,
							})}
							onClick={() => setShowPassword(false)}></i>
						<i
							className={cls({
								"fa-solid fa-eye input__icon": true,
								show: !showPassword,
							})}
							onClick={() => setShowPassword(true)}></i>
					</div>
				) : (
					<Input
						name={name}
						invalid={!!errors[name]}
						type={type}
						{...rest}
						className='input__control'
						readOnly={readOnly}
						autoComplete='on'
					/>
				)}

				{errors[name] ? (
					<FormFeedback className='input__error'>
						{errors[name]?.message}
					</FormFeedback>
				) : (
					""
				)}
			</FormGroup>
		);
	};

	return <>{renderInputField()}</>;
}

export default InputField;
