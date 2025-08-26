


using System.ComponentModel.DataAnnotations;
using System.Reflection;

[AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
public class FromDateBeforeToDateValidator : ValidationAttribute
{
    public string OtherProperty { get; }

    public string? OtherPropertyDisplayName { get; internal set; }

    public FromDateBeforeToDateValidator(string otherProperty)
    {
        OtherProperty = otherProperty;
    }
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        var otherPropertyInfo = validationContext.ObjectType.GetRuntimeProperty(OtherProperty);

        if (otherPropertyInfo == null)
        {
            return new ValidationResult("Property does not exist");
        }

        if (otherPropertyInfo.GetIndexParameters().Length > 0)
        {
            throw new ArgumentException();
        }

        if (otherPropertyInfo.PropertyType != typeof(DateTime))
        {
            throw new ArgumentException("Other property must be a date time");
        }

        object? otherPropertyValue = otherPropertyInfo.GetValue(validationContext.ObjectInstance, null);

        if (otherPropertyValue is not null && value is not null)
        {
            if (DateTime.TryParse(otherPropertyValue.ToString(), out DateTime otherDate))
            {
                if (DateTime.TryParse(value.ToString(), out DateTime firstDate))
                {
                    if (firstDate > otherDate)
                    {
                        string[]? memberNames = validationContext.MemberName != null
                           ? new[] { validationContext.MemberName }
                           : null;
                        return new ValidationResult(FormatErrorMessage(validationContext.DisplayName), memberNames);
                    }
                }
            }
        }

        return null;
    }
}