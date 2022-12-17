import { Info } from '../../styles';
import ProfileSection from '../ProfileSection';

interface Props {
	locked?: boolean;
}

const SubscriptionSection = ({ locked = false }: Props) => {
	return (
		<ProfileSection title='Subscription' locked={locked}>
			<Info>You have no active subscriptions.</Info>
		</ProfileSection>
	);
};

export default SubscriptionSection;
